<template>
  <div>
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <span @click="closeModal" class="close">&times;</span>
      <h3 class="modal-content__title">Добавить пользователя</h3>
      <form class="modal-content__form" @submit.prevent="addNewUser">
        <label class="modal-content__label" for="name">Имя:</label>
        <input
          class="modal-content__input"
          type="text"
          id="name"
          placeholder="Введите имя..."
          v-model="newUser.name"
          required
        />

        <label class="modal-content__label" for="phoneNumber">Телефон:</label>
        <input
          class="modal-content__input"
          type="text"
          id="phoneNumber"
          placeholder="Введите номер телефона..."
          v-model="newUser.phoneNumber"
          required
        />

        <label class="modal-content__label" for="parent">Начальник:</label>
        <select id="parent" v-model="newUser.parentId">
          <option value=""></option>
          <option v-for="contact in flattenedContacts" :value="contact.id" :key="contact.id">
            {{ contact.name }}
          </option>
        </select>
        <button class="modal-content__btn" type="submit">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalForm",
  data() {
    return {
      newUser: {
        name: "",
        phoneNumber: "",
        parentId: "",
      },
    };
  },
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    flattenedContacts() {
      const flatten = (contacts, level) => {
        let flattened = [];
        for (const contact of contacts) {
          contact.level = level;
          flattened.push(contact);
          if (contact.children.length > 0) {
            flattened = flattened.concat(flatten(contact.children, level + 1));
          }
        }
        return flattened;
      };

      return flatten(this.contacts, 0);
    },
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },

    addNewUser() {
      this.$emit("addNewUser", this.newUser);
      this.newUser = {
        name: "",
        phoneNumber: "",
        parentId: "",
      };
    },
  },
};
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 38px;
    cursor: pointer;
  }

  .modal-content__title {
    margin-top: 0;
  }

  .modal-content__form {
    margin-top: 20px;
  }

  .modal-content__label {
    display: block;
    margin-bottom: 5px;
  }

  .modal-content__input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .modal-content__btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }

  .modal-content__btn:hover {
    background-color: #6bbf6e;
  }
</style>
