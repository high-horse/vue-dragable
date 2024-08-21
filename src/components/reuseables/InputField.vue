<script setup lang="ts">
import { InputFieldProps, defaultInputClass } from "../../types/types";
const props = defineProps<InputFieldProps>();
</script>

<template>
    <span class="py-2">
        <label :for="props.id">{{ props.label }}</label>
        <input
            :type="props.type"
            :name="props.name"
            :id="props.id"
            :placeholder="props.placeholder"
            :class="props.class || defaultInputClass"
            :required="props.required"
        />
    </span>
</template>
s
