<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CourseSelectionTile from '@/components/CourseSelectionTile.vue'
import MyButton from '@/components/MyButton.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import DbService from '@/services/DbService'

const router = useRouter()

const availableCourses = DbService.getAvailableCourses()

const selectedCourses = ref<number[]>(DbService.getMyCoursesIds())

function toggleSelectCourse(id: number) {
  const index = selectedCourses.value.indexOf(id)
  if (index !== -1) {
    selectedCourses.value.splice(index, 1)
  } else {
    selectedCourses.value.push(id)
  }
}

function submit() {
  if (selectedCourses.value.length > 0) {
    DbService.selectMyCourses(selectedCourses.value)
    router.push('/app/practice')
  }
}
</script>

<template>
  <div class="h-screen bg-app-blue overflow-y-scroll flex flex-col md:flex-row">
    <div class="grid place-items-center">
      <img src="@/assets/images/speaker.png" class="w-full md:w-auto md:object-cover" />
    </div>
    <div class="flex flex-col md:flex-1">
      <h1 class="text-black mx-8 mb-9 md:mt-10">Select your courses</h1>
      <div class="min-w-72 mx-8 mb-32 flex-1 flex flex-col gap-y-3">
        <CourseSelectionTile
          v-for="course in availableCourses"
          :key="course.id"
          :title="course.title"
          :subtitle="`${course.numSentences} sentences`"
          :is-selected="selectedCourses.includes(course.id)"
          @click="toggleSelectCourse(course.id)"
        />
      </div>
    </div>
    <div class="fixed bottom-8 right-8">
      <MyButton color="yellow" class="gap-x-3" @click="submit">
        Continue <MaterialIcon name="arrow_forward" class="text-black -mr-2" />
      </MyButton>
    </div>
  </div>
</template>
