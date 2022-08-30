<template>
    <ScreenAdapter>
        <div class="main">
            <div class="login">
                <img :src='Logo' class="logo" />
                <img :src='LogoTitle' class="title" />
                <div class="qr" ref='QRref'></div>
                <div class="des">请扫描此二维码登录</div>
            </div>
        </div>
    </ScreenAdapter>

</template>
<script lang="ts" setup>
import ScreenAdapter from "@/components/ScreenAdapter.vue";
let Logo = require('@/assets/login/logo.webp')
let LogoTitle = require('@/assets/login/logo-title.webp') 
</script>
<style lang="less">
body {
    width: 100vw;
    height: 100vh;
    background-color: #001b20;
    overflow: hidden;
}
.main {
    background: url('~@/assets/login/main-bg.webp') no-repeat center center;
    background-size: contain;
    // width: 1920px;
    // height: 1080px;
    height: 100%;
    background-color: #00171c;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    .login {
        background: url('~@/assets/login/login-bg.webp') no-repeat center center;
        background-size: contain;
        width: 540px;
        height: 600px;
        margin-right: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .logo {
            width: 169px;
            height: 45px;
            border: 0;
            margin-top: 66px;
        }

        .title {
            width: 300px;
            height: 37px;
            border: 0;
            margin-top: 11px;
        }

        .qr {
            width: 220px;
            height: 220px;
            padding: 10px;
            margin-top: 62px;
            background-color: #fff;
        }

        .des {
            margin-top: 19px;
            width: 188px;
            height: 21px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
        }
    }
}
</style>