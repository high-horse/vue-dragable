<script setup lang="ts">
import { ref } from "vue";
import { InputFieldProps } from "../../types/types";
import InputField from "../reuseables/InputField.vue";

const itemNameInput: InputFieldProps = {
  type: "text",
  name: "itemName",
  id: "itemName",
  placeholder: "Item Name Enter here",
  required: true,
  label: "Item Name"
};

const itemNameInputValue = ref<string>("");
</script>

<template>
  <form>
    <InputField v-bind="itemNameInput" v-model="itemNameInputValue" />
  </form>
</template>
