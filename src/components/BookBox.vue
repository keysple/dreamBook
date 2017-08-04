<template>
  <div :style="style">
    <div>
      <div class="mu-book-box">
        <slot></slot>
        <div class="mu-grid-tile-titlebar">
          <div class="mu-grid-tile-action">
            <slot name="action"></slot>
          </div>
        </div>
      </div>
    </div>
    <div>
      <slot name="title">
        {{title}}
      </slot>
    </div>
    <div>
      <slot name="deleteChip">
        {{chipName}}
      </slot>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Booxbox',
    props: {
      cols: {
        type: Number,
        default: 1
      },
      rows: {
        type: Number,
        default: 1
      },
      title: {
        type: String
      },
      subtitle: {
        type: String
      },
      chipName: {
        type: String,
      }
    },
    data(){
      return {}
    },
    computed: {
      style () {
        return {
          width: (this.cols / this.$parent.cols * 100) + '%',
          padding: (this.$parent.padding / 2) + 'px',
          height: (this.$parent.cellHeight * this.rows + 10) + 'px'
        }
      }
    }
  }
</script>
<style>
  .mu-book-box {
    position: relative;
    display: block;
    height: 100%;
    overflow: hidden;
  }

  .mu-book-box img {
    height: 150px;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
  }

  .mu-grid-tile-action {
    order: 1;
    height: 100%;
    width: 100%;
  }

  .mu-grid-tile-titlebar {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center
  }

</style>
