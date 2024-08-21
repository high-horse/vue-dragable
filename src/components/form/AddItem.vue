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
    label: "Item Name",
};
const itemNameInputValue = ref<string>("");

const itemGroupInput: InputFieldProps = {
    type: "number",
    name: "itemGroup",
    id: "itemGroup",
    placeholder: "Item Group Enter here",
    required: true,
    label: "Item Group",
};
const itemGroupInputValue = ref<number>("");
</script>

<template>
    <form>
        <InputField v-bind="itemNameInput" v-model="itemNameInputValue" />
        <InputField v-bind="itemGroupInput" v-model="itemGroupInputValue" />
        
    </form>
</template>
