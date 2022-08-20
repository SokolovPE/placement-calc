<template>
  <div>
    <v-container class="input-container">
      <v-text-field
        class="shrink-ti"
        v-model="resolutionX"
        label="ResolutionX"
      ></v-text-field>
      <v-text-field
        class="shrink-ti"
        v-model="resolutionY"
        label="ResolutionY"
      ></v-text-field>
      <v-text-field
        class="shrink-ti"
        v-model="rowCnt"
        label="Items in a row"
      ></v-text-field
      ><v-btn @click="save">Save</v-btn>
    </v-container>

    <v-container>
      <h2 class="error" v-if="saved">
        Saved, refresh page please to get new values
      </h2>
    </v-container>
    <v-container> Set scale to: {{ scale }} </v-container>
    <v-container class="grey lighten-5 mb-6" v-if="items.length > 0">
      <v-row :align="'start'" no-gutters v-for="i in rowCnt" :key="i">
        <v-col v-for="j in rowCnt" :key="j">
          <v-card class="pa-2" outlined tile>
            {{ items[rowCnt * (i - 1) + (j - 1)].x }} /
            {{ items[rowCnt * (i - 1) + (j - 1)].y }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rowCnt: 3,
      resolutionX: 1920,
      resolutionY: 1080,
      saved: false
    };
  },
  computed: {
    colCnt: function() {
      return this.rowCnt;
    },
    scale: function() {
      return 100 / this.rowCnt;
    },
    frameSizeX: function() {
      return this.resolutionX / this.rowCnt;
    },
    frameSizeY: function() {
      return this.resolutionY / this.rowCnt;
    },
    initialOffsetX: function() {
      return this.frameSizeX / 2;
    },
    initialOffsetY: function() {
      return this.frameSizeY / 2;
    },
    items: function() {
      let localItems = [];
      for (var col = 0; col < this.rowCnt; col++) {
        let rows = [];
        for (var row = 0; row < this.rowCnt; row++) {
          let xPos = this.positionX(row);
          let yPos = this.positionY(col);
          let item = { x: xPos, y: yPos };
          rows.push(item);
        }
        localItems.push(...rows);
      }
      return localItems;
    }
  },
  methods: {
    positionX: function(rowIndex) {
      return this.initialOffsetX + this.frameSizeX * rowIndex;
    },
    positionY: function(colIndex) {
      return this.initialOffsetY + this.frameSizeY * colIndex;
    },
    save: function() {
      localStorage.setItem("calc-row-cnt", this.rowCnt);
      localStorage.setItem("calc-resx", this.resolutionX);
      localStorage.setItem("calc-resy", this.resolutionY);
      this.saved = true;
    }
  },
  mounted: function() {
    let rowsFromStorage = parseInt(localStorage.getItem("calc-row-cnt")) || 5;
    this.rowCnt = rowsFromStorage;
    let resolutionXFromStorage =
      parseInt(localStorage.getItem("calc-resx")) || 1920;
    this.resolutionX = resolutionXFromStorage;
    let resolutionYFromStorage =
      parseInt(localStorage.getItem("calc-resy")) || 1080;
    this.resolutionY = resolutionYFromStorage;
  }
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-wrap: wrap;

  .shrink-ti {
    max-width: 100px;
    width: 100px;
  }
}
</style>
