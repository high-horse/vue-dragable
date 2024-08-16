<script setup lang="ts">
import { ref } from "vue";

interface itemType {
  id: number,
  title: string,
  list: number
}

const items = ref<itemType[]>([
    { id: 0, title: "Item A", list: 1 },
    { id: 1, title: "Item B", list: 1 },
    { id: 2, title: "Item C", list: 2 },
]);

const getList = (list : itemType) => {
    return items.value.filter((item) => item.list == list);
};

const startDrag = (event, item) => {
    console.log(item);
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("itemID", item.id);
};

const onDrop = (event, list) => {
    const itemID = event.dataTransfer.getData("itemID");
    const item = items.value.find((item) => item.id == itemID);
    item.list = list;
};


</script>

<template>
    <div class="drop-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
        <div
            v-for="item in getList(1)"
            :key="item.id"
            class="drag-el"
            draggable="true"
            @dragstart="startDrag($event, item)"
        >
            {{ item.title }}
        </div>
    </div>
    <div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
        <div
            v-for="item in getList(2)"
            :key="item.id"
            class="drag-el"
            draggable="true"
            @dragstart="startDrag($event, item)"
        >
            {{ item.title }}
        </div>
    </div>
</template>

<style scoped>
.drop-zone {
    border: 1px solid #ddd;
    padding: 1rem;
    margin: 1rem;
    min-height: 200px;
}

.drag-el {
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: #f9f9f9;
    color: black;
}
</style>
