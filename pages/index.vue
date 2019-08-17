<template>
  <div class="wrapper">
    <div class="header">
      <p class="title">color scheme checker</p>
    </div>
    <div class="form-group">
      <b-button-group class="btn-group">
        <b-button v-b-modal.modal-prevent-closing variant="success" class="edit-btn btn">edit</b-button>
        <b-button variant="primary" class="add-btn btn" @click="addColor">add color</b-button>
      </b-button-group>
      <transition name="transit">
        <div class="add-alert" v-show="add">Added color!</div>
      </transition>

      <b-modal id="modal-prevent-closing" ref="modal" title="BootstrapVue">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-card bg-variant="light">
            <b-form-group
              label-cols-lg="3"
              label="Text"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group
                label-cols-sm="2"
                label="Name:"
                label-align-sm="center"
                label-for="nested-street"
              >
                <b-form-input id="nested-street" v-model="buttonName"></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="2"
                label="Code:"
                label-align-sm="center"
                label-for="nested-city"
              >
                <b-form-input id="nested-city" type="text" v-model="textColor"></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="2"
                label="Color:"
                label-align-sm="center"
                label-for="nested-state"
              >
                <b-form-input id="nested-state" type="color" v-model="textColor"></b-form-input>
              </b-form-group>
            </b-form-group>
            <b-form-group
              label-cols-lg="3"
              label="Button"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group
                label-cols-sm="2"
                label="Code:"
                label-align-sm="center"
                label-for="nested-city"
              >
                <b-form-input id="nested-city" type="text" v-model="boxColor"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="2"
                label="Color:"
                label-align-sm="center"
                label-for="nested-state"
              >
                <b-form-input id="nested-state" type="color" v-model="boxColor"></b-form-input>
              </b-form-group>
            </b-form-group>
          </b-card>
        </form>
      </b-modal>
    </div>

    <div class="box_wrapper">
      <div class="bg_box" v-for="bgColor in bgRandomColors" v-bind:style="{background:bgColor}">
        <div class="box" v-bind:style="{background:boxColor}">
          <span v-bind:style="{color:textColor}">{{buttonName}}</span>
        </div>
        <div class="colorCode">
          <div class="bgCode" @click="copy">{{bgColor}}</div>
          <div class="boxCode" @click="copy" v-bind:style="{background:boxColor}">{{boxColor}}</div>
        </div>
      </div>
    </div>
    <a v-scroll-to="'body'">
      <i class="fas fa-arrow-alt-circle-up top-btn"></i>
    </a>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      bgRandomColors: [],
      boxColor: "#fbfbfb",
      textColor: "#707070",
      length: 300,
      buttonName: "HELLO!",
      add: false
    };
  },

  created: function() {
    this.showColor();
  },
  mounted() {},
  methods: {
    showColor: function() {
      for (let i = 0; i < this.length; i++) {
        this.bgRandomColors.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      console.log(this.bgRandomColors);
    },
    addColor: function() {
      this.add = !this.add;
      this.showColor();
      setTimeout(() => {
        this.add = !this.add;
      }, 4000);
    },
    copy: function() {
      // 目的の文字列が入っている p要素を取得します。
      const element = event.target;
      console.log(event.target);
      // seletionオブジェクトを取得します。
      const selection = window.getSelection();
      // rangeオブジェクトを生成します。
      const range = document.createRange();
      // rangeオブジェクトに p要素を与えます。
      range.selectNodeContents(element);
      // 一旦、selectionオブジェクトの持つ rangeオブジェクトを削除します。
      selection.removeAllRanges();
      // 改めて先程生成した rangeオブジェクトを selectionオブジェクトに追加します。
      selection.addRange(range);
      console.log("選択された文字列: ", selection.toString());
      // クリップボードにコピーします。
      const copyTxt = selection.toString();
      const succeeded = document.execCommand("copy");
      if (succeeded) {
        // コピーに成功した場合の処理です。

        element.textContent = "COPIED!";
        setTimeout(() => {
          element.textContent = copyTxt;
        }, 1000);
      } else {
        // コピーに失敗した場合の処理です。
        alert("コピーが失敗しました!");
      }
      // selectionオブジェクトの持つrangeオブジェクトを全て削除しておきます。
      selection.removeAllRanges();
    }
  }
};
</script>
