<template>
  <div id="app">

    <section class="app_top">
    </section>

    <section class="app_content">

      <div class="input_line">
        <label for="Name"> 机构名称 </label>
        <input id="Name" type="text" v-model="organization_name"/>
      </div>
      <div class="input_line" @click="typeDataShow">
        <p>机构类型</p>
        <p>(按摩、医美、其他)</p>
        <p> {{ organization_type }} </p>
      </div>
      <div class="input_line">
        <label for="Area"> 所属地区 </label>
        <input id="Area" type="text" v-model="organization_area" />
      </div>
      <div class="input_line" @click="onOffDataShow">
        <p>是否有营业执照</p>
        <p> {{ organization_license }} </p>
      </div>
      <div class="input_line">
        <label for="setupTime"> 成立时间 </label>
        <input name="setupTime" type="text" @click="setDate" v-bind:value="organization_SetUpdate" placeholder="请选择截止时间..."/>
      </div>
      <div class="input_line">
        <label for="guy"> 联系人 </label>
        <input id="guy" type="text" v-model="organization_contantGuy"/>
      </div>
      <div class="input_line">
        <label for="way"> 联系方式 </label>
        <input id="way" type="text" v-model="organization_contantWay"/>
      </div>
      <div class="input_line">
        <label for="other"> 其他留言介绍 </label>
        <input id="other" type="text" v-model="organization_other"/>
      </div>

    </section>

    <section class="app_fotter"> 提交资料 </section>


      <transition name="slide-fade">
        <section class="app_mask" v-if="seen" @click="setSeen"></section>
      </transition>

      <transition name="bounce">
        <section class="chooseModle" v-if="seen" @click="setSeen">
          <ul>
            <li v-for="typeData in typeData" @click.stop="setType">
              {{ typeData }}
            </li>
            <!-- <li @click.stop="setType">按摩</li>
            <li>医美</li>
            <li>其他</li> -->
          </ul>
        </section>
      </transition>

  </div>
</template>

<script>
import Heihei from './button.vue';
import '../style/sass/input.scss';

export default {
  name: 'App',
  data () {
    return {
        typeData:[],
        organization_area:'黑恶化IEhi',
        organization_name:'123123z',
        organization_type:'',
        organization_license:'',
        organization_SetUpdate:'',
        organization_contantGuy:'',
        organization_contantWay:'',
        organization_other:'',
        modelType: true,
        seen: false,
    }
  },
  methods:{
      setName(){
        console.log( this.setName )
      },
      setSeen(){
        this.seen = !this.seen;
      },
      onOffDataShow(){
        this.typeData = ['是','否'];
        this.setSeen();
      },
      typeDataShow(){
        this.typeData = ['按摩','医美','其他'];
        this.setSeen();
      },
      setType( ev ){
        console.log( this.typeData.length );
        if( this.typeData.length == 2 ){
          this.organization_license = ev.target.innerHTML;
        }else if( this.typeData.length == 3 ){
          this.organization_type = ev.target.innerHTML;
        }
        this.seen = false;
      },
      setDate(){
        console.log(this.date)
         this.$picker.show({
           type:'datePicker',
           onOk: (date) =>{
             this.organization_SetUpdate = date
           }
         });
      }
  },
  components:{
    Heihei
  }
}
</script>

<style lang="scss">

  .slide-fade-leave-active,.slide-fade-enter-active {
    transition: all .3s;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
  }


  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
