<script setup lang="ts">
import { ref } from "vue";

interface ItemType {
  id: number,
  title: string,
  list: number
}

const items = ref<ItemType[]>([
    { id: 0, title: "Item A", list: 1 },
    { id: 1, title: "Item B", list: 1 },
    { id: 2, title: "Item C", list: 2 },
]);

const getList = (list : number) => {
    return items.value.filter((item) => item.list == list);
};

const startDrag = (event: DragEvent, item: ItemType) => {
  if (event.dataTransfer) {
      console.log(item);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item.id.toString());
  }
};

const onDrop = (event: DragEvent, list:  ItemType['list']) => {
  if (event.dataTransfer) {
    const itemID = event.dataTransfer.getData("itemID");
    const item = items.value.find((item) => item.id.toString() == itemID);
    if(item) {
      item.list = list;
    }
  }
};



// const onDrop = (event: DragEvent, list: ItemType['list']) => {
//   if (event.dataTransfer) {
//     const itemID = parseInt(event.dataTransfer.getData("itemID"));
//     const itemIndex = items.value.findIndex((item) => item.id === itemID);
//     if (itemIndex !== -1) {
//       const [item] = items.value.splice(itemIndex, 1);
//       item.list = list;
//       const insertIndex = items.value.findIndex((i) => i.list === list);
//       if (insertIndex === -1) {
//         items.value.push(item);
//       } else {
//         items.value.splice(insertIndex, 0, item);
//       }
//     }
//   }
// };



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
