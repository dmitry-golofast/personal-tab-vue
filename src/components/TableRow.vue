<template>
  <div class="table-row">
    <div class="table-row__container" @click="toggleOpenState">
      <div class="table-row__cell">
        <div
          class="table-row__open"
          v-if="hasChildNodes"
        >
          <div class="table-row__actions" :class="{ 'table-row__actions--open': isOpen }">
            {{ isOpen ? '-' : '+' }}
          </div>
        </div>
        {{ contact.name }}
      </div>
      <div class="table-row__cell">{{ contact.phoneNumber }}</div>
    </div>
    <div class="table-row__children" v-if="isOpen">
      <table-row
        :contact="child"
        v-for="child in contact.children"
        :key="child.id"
      ></table-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TableRow",
    props: {
      contact: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      return {
        isOpen: false,
      };
    },

    computed: {
      hasChildNodes() {
        return this.contact.children && this.contact.children.length > 0;
      },
    },

    methods: {
      toggleOpenState() {
        this.isOpen = !this.isOpen;
      },
    },
  };
</script>

<style scoped>
  .table-row__children {
    margin-left: 20px;
  }

  .table-row {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .table-row__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 3px 0;
  }

  .table-row__cell {
    display: flex;
    padding: 5px;
    flex-basis: 50%;
    font-size: 18px;
  }

  .table-row__cell:hover {
    cursor: pointer;
    background-color: #eee;
}

  .table-row__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #b0b0b0;
    color: #fff;
    font-size: 16px;
    margin-right: 5px;
  }

  .table-row__actions--open {
    background-color: #cccccc;
  }
</style>
