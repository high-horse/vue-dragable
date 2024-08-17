<script setup lang="ts">
import { ref, computed } from "vue";

interface ItemType {
    id: number;
    title: string;
    list: number;
}

const items = ref<ItemType[]>([
    { id: 0, title: "Item A", list: 1 },
    { id: 1, title: "Item B", list: 1 },
    { id: 2, title: "Item C", list: 2 },
    { id: 3, title: "Item D", list: 2 },
    { id: 4, title: "Item E", list: 3 },
    { id: 5, title: "Item F", list: 3 },
    { id: 6, title: "Item G", list: 4 },
    { id: 7, title: "Item H", list: 4 },
    { id: 8, title: "Item I", list: 1 },
    { id: 9, title: "Item J", list: 1 },
    { id: 10, title: "Item I", list: 2 },
    { id: 11, title: "Item J", list: 2 },
    { id: 12, title: "Item I", list: 3 },
    { id: 13, title: "Item J", list: 3 },
    { id: 14, title: "Item I", list: 4 },
    { id: 15, title: "Item J", list: 4 },
]);

const getList = computed(
    () => (list: number) => items.value.filter((item) => item.list === list),
);

const startDrag = (event: DragEvent, item: ItemType) => {
    if (event.dataTransfer) {
        console.log(item);
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("itemID", item.id.toString());
    }
};

// const onDrop = (event: DragEvent, list: ItemType['list']) => {
//   if (event.dataTransfer) {
//     const itemID = parseInt(event.dataTransfer.getData("itemID"));
//     const itemIndex = items.value.findIndex((item) => item.id === itemID);
//     if (itemIndex !== -1) {
//       const [item] = items.value.splice(itemIndex, 1);
//       item.list = list;

//       // Get the drop target
//       const dropTarget = event.target as HTMLElement;
//       const dropTargetRect = dropTarget.getBoundingClientRect();
//       const dropY = event.clientY;

//       // Find the index to insert the item
//       const listItems = items.value.filter((i) => i.list === list);
//       let insertIndex = listItems.length;

//       for (let i = 0; i < listItems.length; i++) {
//         const itemElement = document.getElementById(`item-${listItems[i].id}`);
//         if (itemElement) {
//           const itemRect = itemElement.getBoundingClientRect();
//           if (dropY < itemRect.top + itemRect.height / 2) {
//             insertIndex = i;
//             break;
//           }
//         }
//       }

//       // Insert the item at the calculated index
//       const newIndex = items.value.findIndex((i) => i.list === list && i.id === listItems[insertIndex]?.id);
//       if (newIndex === -1) {
//         items.value.push(item);
//       } else {
//         items.value.splice(newIndex, 0, item);
//       }
//     }
//   }
// };

const onDrop = (event: DragEvent, list: ItemType["list"]) => {
    if (event.dataTransfer) {
        const itemID = parseInt(event.dataTransfer.getData("itemID"));
        const itemIndex = items.value.findIndex((item) => item.id === itemID);
        if (itemIndex !== -1) {
            const [item] = items.value.splice(itemIndex, 1);
            item.list = list;

            const dropY = event.clientY;

            // Find the index to insert the item
            const listItems = items.value.filter((i) => i.list === list);
            let insertIndex = listItems.length;

            for (let i = 0; i < listItems.length; i++) {
                const itemElement = document.getElementById(
                    `item-${listItems[i].id}`,
                );
                if (itemElement) {
                    const itemRect = itemElement.getBoundingClientRect();
                    if (dropY < itemRect.top + itemRect.height / 2) {
                        insertIndex = i;
                        break;
                    }
                }
            }

            // Insert the item at the calculated index
            const newIndex = items.value.findIndex(
                (i) => i.list === list && i.id === listItems[insertIndex]?.id,
            );
            if (newIndex === -1) {
                items.value.push(item);
            } else {
                items.value.splice(newIndex, 0, item);
            }
        }
    }
};
</script>
<template>
    <div>
        <button class="bg-purple-800 p-2 rounded-full hover:bg-purple-400">
            add item
        </button>
    </div>
    <div class="grid grid-cols-4 gap-4">
        <div
            class="drop-zone bg-red-300"
            @drop="onDrop($event, 1)"
            @dragenter.prevent
            @dragover.prevent
        >
            <span class="color-label">Group 1:</span><br />
            <div class="scroll-cls">
                <div
                    v-for="item in getList(1)"
                    :key="item.id"
                    :id="`item-${item.id}`"
                    class="drag-el"
                    draggable="true"
                    @dragstart="startDrag($event, item)"
                >
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div
            class="drop-zone bg-yellow-300"
            @drop="onDrop($event, 2)"
            @dragenter.prevent
            @dragover.prevent
        >
            <span class="color-label">Group 2:</span><br />
            <div class="scroll-cls">
                <div
                    v-for="item in getList(2)"
                    :key="item.id"
                    :id="`item-${item.id}`"
                    class="drag-el"
                    draggable="true"
                    @dragstart="startDrag($event, item)"
                >
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div
            class="drop-zone bg-green-300"
            @drop="onDrop($event, 3)"
            @dragenter.prevent
            @dragover.prevent
        >
            <span class="color-label">Group 3:</span><br />
            <div class="scroll-cls">
                <div
                    v-for="item in getList(3)"
                    :key="item.id"
                    :id="`item-${item.id}`"
                    class="drag-el"
                    draggable="true"
                    @dragstart="startDrag($event, item)"
                >
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div
            class="drop-zone bg-blue-300"
            @drop="onDrop($event, 4)"
            @dragenter.prevent
            @dragover.prevent
        >
            <span class="color-label">Group 4:</span><br />
            <div class="scroll-cls">
                <div
                    v-for="item in getList(4)"
                    :key="item.id"
                    :id="`item-${item.id}`"
                    class="drag-el"
                    draggable="true"
                    @dragstart="startDrag($event, item)"
                >
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Ensure the drop-zone takes up full height up to the max-height */
.drop-zone {
    border: 1px solid #ddd;
    padding: 1rem;
    margin: 1rem;
    display: flex; /* Use flex to handle inner elements properly */
    flex-direction: column; /* Stack items vertically */
    max-height: 87vh; /* Constrain height */
    overflow: hidden; /* Hide overflow to handle it in the scroll container */
}

/* The scroll container should take all the remaining height and allow scrolling */
.scroll-cls {
    flex: 1; /* Take remaining height in drop-zone */
    overflow-y: auto; /* Enable scrolling */
}

/* Styling for drag elements */
.drag-el {
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: #f9f9f9;
    color: black;
}

/* Color label styling */
.color-label {
    font-weight: bold;
    color: black;
}
</style>
