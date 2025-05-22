<script setup>
import fryChicken from '../assets/images/fry_chicken.jpg';

</script>

<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" align="center" justify="center">
                <v-img
                    :src="fryChicken"
                    width="90%"
                    aspect-ratio="1/1"
                    cover
                ></v-img>
            </v-col>
            <v-col cols="12">
                <div style="font-size: 24px;">《最後一塊炸雞》</div>
                <p style="margin-top: 10px;">
                    在一個和平小鎮，雞爸爸與小雞相依為命，過著平凡的生活。直到某天，小雞失蹤，雞爸爸進入炸雞工廠打工，只為查出真相。

                    某晚，他配合處理一批訂單，流程機械冷漠，他照做了。直到幾天後，他發現炸雞中有塊形狀與眼神酷似小雞的雞塊。那瞬間，他明白了一切——他親手炸了自己的孩子。

                    那天起，雞爸爸不再說話。他默默離開工廠，剪去雞冠，藏身陰影，成為一位復仇的忍者。他不再相信制度，也不再相信文明。他只相信痛苦。

                    從此，每當有人在路邊隨意小便，他便會突然現身，以驚人身手斬斷其老二，冷靜收走，風一般消失。他把這些切下來的標本編號、泡製、陳列，成為他心中的「警世博物館」。

                    他不再尋找公道，因為對他而言，正義早已被炸得酥脆。
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>