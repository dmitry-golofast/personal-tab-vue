<template>
  <div class="contacts-list">
    <div class="contact-list__table-header">
      <div class="contact-list__table-header-cell" @click="sortByNames">Имя</div>
      <div class="contact-list__table-header-cell">Телефон</div>
    </div>
    <div class="contact-list__table">
      <TableRow
        :contact="contact"
        v-for="contact in contacts"
        :key="contact.id"
      ></TableRow>
    </div>
    <div class="contact-list__table-actions">
      <button class="contact-list__table-actions-btn" @click="openModal">Добавить</button>
    </div>
    <ModalForm
      :contacts="contacts"
      v-if="showModal"
      @closeModal="closeModal"
      @addNewUser="addNewUser"
    ></ModalForm>
  </div>
</template>

<script>
import TableRow from "./TableRow";
import ModalForm from "./ModalForm";

export default {
  components: { ModalForm, TableRow },

  data() {
    return {
      contacts: [],
      showModal: false,
    };
  },

  mounted() {
    this.loadContactsFromLocalStorage();
  },

  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    saveContactsToLocalStorage() {
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    },

    loadContactsFromLocalStorage() {
      const storedContacts = localStorage.getItem("contacts");
      if (storedContacts) {
        this.contacts = JSON.parse(storedContacts).filter(
          (item) => item.parentId === ""
        );
      }
    },

    findParentContact(contactId, contacts) {
      for (const contact of contacts) {
        if (contact.id === contactId) {
          return contact;
        }
        if (contact.children.length > 0) {
          const foundContact = this.findParentContact(contactId, contact.children);
          if (foundContact) {
            return foundContact;
          }
        }
      }
      return null;
    },

    addNewUser(user) {
      const newContact = {
        id: Date.now(),
        name: user.name,
        phoneNumber: user.phoneNumber,
        parentId: user.parentId,
        children: [],
      };

      const parentContact = this.findParentContact(newContact.parentId, this.contacts);
      if (parentContact) {
        parentContact.children.push(newContact);
        newContact.level = parentContact.level + 1;
      } else {
        this.contacts.push(newContact);
        newContact.level = 0;
      }

      this.saveContactsToLocalStorage();

      user.name = "";
      user.phoneNumber = "";
      user.parentId = "";
      this.showModal = false;
    },

    sortByNames() {
      this.sortContactsByLevel(this.contacts);
    },

    sortContactsByLevel(contacts) {
      contacts.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      for (const contact of contacts) {
        if (contact.children.length > 0) {
          this.sortContactsByLevel(contact.children);
        }
      }
    },
  },
};
</script>

<style scoped>
  .contacts-list {
    display: flex;
    border: 1px solid #cfd1cd;
    flex-direction: column;
    gap: 10px;
    max-width: 800px;
    padding: 10px;
    border-radius: 8px;
  }

  .contact-list__table-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    font-size: 20px;
  }

  .contact-list__table-header-cell {
    width: 50%;
    padding: 5px;
    border: 1px solid #B5B8B1;
    border-collapse: collapse;
    border-radius: 4px;
  }
  .contact-list__table-header-cell:first-child {
    cursor: pointer;
  }

  .contact-list__table-actions-btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }

  .contact-list__table-actions-btn:hover {
    background-color: #6bbf6e;
  }
</style>
