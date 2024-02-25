<script setup lang="ts">
import CourseCardBig from '@/components/CourseCardBig.vue'
import CourseCardSmall from '@/components/CourseCardSmall.vue'
import DbService from '@/services/DbService'

const courses = DbService.getMyCourses()
const mainCourse = courses[0]
const otherCourses = courses.slice(1)
</script>

<template>
  <div class="px-5 pt-11">
    <h1 class="ml-3 mb-10">Your courses</h1>
    <h3 class="text-white/60 text-sm font-semibold ml-3 mb-4">Continue studying</h3>
    <CourseCardBig :course="mainCourse" @click="$router.push(`/practice/${mainCourse.id}`)" />
    <h3 v-if="otherCourses.length > 0" class="text-white/60 text-sm font-semibold ml-3 mt-8 mb-4">
      Other courses
    </h3>
    <CourseCardSmall
      v-for="course in otherCourses"
      :key="course.id"
      :course="course"
      class="mb-3"
      @click="$router.push(`/practice/${course.id}`)"
    />
  </div>
</template>
