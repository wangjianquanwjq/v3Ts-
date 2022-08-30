<template>
    <div class="ScreenAdapter" :style="style">
        <slot></slot>
    </div>
</template>
  <script>
import { ref, onMounted } from 'vue';
export default {
    name: '',
    props: {
        width: {
            type: String,
            default: '1920'
        },
        height: {
            type: String,
            default: '1080'
        }
    },
    setup(props) {
        const style = ref({
            width: props.width + 'px',
            height: props.height + 'px',
            transform: 'scale(1) translate(-50%, -50%)'
        });
        const getScale = () => {
            const w = window.innerWidth / props.width;
            const h = window.innerHeight / props.height;
            return w < h ? w : h;
        };
        const setScale = () => {
            style.value.transform = 'scale(' + getScale() + ') translate(-50%, -50%)';
        };
        onMounted(() => {
            setScale();
            window.onresize = setScale;
        });
        return {
            style
        };
    }
};
</script>
    <style lang="less" scoped>
    .ScreenAdapter {
        transform-origin: 0 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: 0.3s;
    }
    </style>