<template>
  <div class="gallery">
    <div v-if="fullMode.enabled" class="gallery-full-view">
      <img :src="`/wedding/gallery/${fullMode.now}.jpg`"/>
      <div class="close-button" @click="handleCloseFullView">X</div>
      <div v-if="fullMode.now > 1" class="left-view-button" @click="handleLeftView">&lt;</div>
      <div v-if="fullMode.now < galleryLength" class="right-view-button" @click="handleRightView">&gt;</div>
    </div>
    <img src="~@/assets/images/bunny.png" class="bunny" />
    <div class="description">
      photo gallery
    </div>
    <div></div>
    <div class="gallery-container" ref="gal">
      <div class="gallery-inner">
        <div class="gallery-item" v-for="n in galleryLength" :key="n" @click="handleClick(n)">
          <div class="image">
            <img
              :src="`/wedding/gallery/${n}.jpg`"
              :style="{
                transform: `translateX(${(((scrollX - (n - 1) * 250) / 4.8 +
                  50 >
                100
                  ? 100
                  : (scrollX - (n - 1) * 250) / 4.8 + 50 < 0
                  ? 0
                  : (scrollX - (n - 1) * 250) / 4.8 + 50) /
                  100) *
                  -55}px)`,
              }"
            />
          </div>
          <div class="arch"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      galleryLength: 6,
      scrollX: 0,
      width: 320,
      fullMode: {
        enabled: false,
        now: 1,
      },
    };
  },
  mounted() {
    this.$refs.gal.addEventListener("scroll", (event) => {
      this.scrollX = event.target.scrollLeft;
    });
    this.width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    this.$refs.gal.scrollLeft = 850;
  },
  methods: {
    handleClick(now) {
      this.fullMode = {
        enabled: true,
        now,
      }
    },
    handleCloseFullView() {
      this.fullMode.enabled = false;
    },
    handleLeftView() {
      this.fullMode.now--;
    },
    handleRightView() {
      this.fullMode.now++;
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery-full-view {
  position: fixed;
  z-index: 12;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    position: absolute;
    top: calc(50% - 60px);
    font-size: 120px;
    cursor: pointer;
  }
  .close-button {
    top: 20px;
    right: 20px;
    font-size: 60px;
  }
  .left-view-button {
    left: 0px;
  }
  .right-view-button {
    right: 0px;
  }
}
.gallery {
  padding-top: 32px;
  padding-bottom: 50px;
  padding-left: $padding-vertical;
  padding-right: $padding-vertical;
  text-align: center;
  color: #295138;
  overflow: hidden;
  .bunny {
    width: 65px;
    margin-bottom: 20px;
  }
  .description {
    font-size: 12px;
    letter-spacing: 6px;
    margin-bottom: 30px;
  }
  .gallery-container {
    padding-left: 20px;
    padding-right: 20px;
    margin-left: -22px;
    margin-right: -22px;
    overflow-x: auto;
    .gallery-inner {
      display: flex;
      .gallery-item {
        flex: 0 0 240px;
        position: relative;
        width: 240px;
        height: 360px;
        margin-right: 10px;
        &:before {
          position: absolute;
          top: 0;
          left: -1px;
          display: block;
          content: "";
          width: 2px;
          height: 360px;
          background-color: #fffdf9;
          z-index: 11;
        }
        &:after {
          position: absolute;
          top: 0;
          right: -1px;
          display: block;
          content: "";
          width: 2px;
          height: 360px;
          background-color: #fffdf9;
          z-index: 11;
        }
        .arch {
          position: absolute;
          top: 0;
          left: 0;
          width: 240px;
          height: 360px;
          background-image: url("~@/assets/images/arch.png");
          background-repeat: no-repeat;
          background-size: 240px auto;
          background-position: top left;
          z-index: 10;
        }
        .image {
          position: absolute;
          top: 0;
          left: 0;
          width: 240px;
          height: 360px;
          overflow: hidden;
          img {
            transition: transform 100ms;
            width: 296px;
            height: 360px;
          }
        }
      }
    }
  }
}
</style>
