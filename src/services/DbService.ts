import type { AvailableCourse } from '@/types/AvailableCourse'
import type { Course } from '@/types/Course'

// hardcoded in memory db for now

const DbService = {
  getAvailableCourses(): AvailableCourse[] {
    return [
      { id: 0, title: 'English - level 1', numSentences: 4 },
      { id: 1, title: 'English - level 2', numSentences: 5 },
      { id: 2, title: 'English - level 3', numSentences: 4 }
    ]
  },
  selectMyCourses(courseIds: number[]) {
    localStorage.setItem('myCourses', JSON.stringify(courseIds))
  },
  getMyCoursesIds(): number[] {
    return JSON.parse(localStorage.getItem('myCourses') ?? '[]')
  },
  getMyCourses(): Course[] {
    const courseIds = this.getMyCoursesIds()
    // temp
    return this.getAvailableCourses()
      .filter((course) => courseIds.includes(course.id))
      .map((course) => ({
        numSentencesDone: this.getMyProgress(course.id),
        ...course
      }))
  },
  getMyCourse(id: number): Course {
    const courseDetails = this.getAvailableCourses().filter((course) => course.id === id)[0]
    return {
      numSentencesDone: this.getMyProgress(id),
      ...courseDetails
    }
  },
  getMyProgress(id: number): number {
    // returns number of sentences learned
    return parseInt(localStorage.getItem(`${id}-progress`) ?? '0')
  },
  setMyProgress(id: number, numSentencesDone: number) {
    localStorage.setItem(`${id}-progress`, numSentencesDone.toString())
  },
  getNextSentence(id: number, numSentencesDone: number): string {
    if (id === 0) {
      // english - level 2
      if (numSentencesDone >= 4) return ''
      return [
        // '"Ted, have you fed the cats yet?" asked Susan, looking up from her knitting.',
        'The sun began to set, splashing the horizon with hues of pink and orange.',
        'Our solar system is located in the Milky Way galaxy, billions of years old.',
        'The Sahara desert, vast and seemingly endless, is the third largest desert in the world.',
        '"Do practice the piano before dinner," Megan\'s mother reminded her gently.'
      ][numSentencesDone]
    }
    if (id === 1) {
      if (numSentencesDone >= 5) return ''
      return [
        'When you are a Bear of Very Little Brain, and you Think of Things, you find sometimes that a Thing which seemed very Thingish inside you is quite different when it gets out into the open and has other people looking at it.',
        'The Little Prince is a poignant tale about growing up and the loss of childhood innocence.',
        'Throughout her autobiography, Maya Angelou depicts resilience despite a life punctuated by unimaginable trauma.',
        'In the realm of Zaelia, Elira the Elf Queen, breathed life into various plants using her magical prowess.',
        'Kenneth, a fervent paleontologist, spent the summer cautiously unearthing the incomplete skeleton of a Tyrannosaurus Rex.'
      ][numSentencesDone]
    }
    if (id === 2) {
      if (numSentencesDone >= 4) return ''
      return [
        'Warped in the convoluted fabric of spacetime, the astronaut hurtled towards the cyanotic expanse of the cosmos.',
        // 'Reading Dostoevsky\'s "Notes from Underground," one wades through the catacomb of humanity\'s existential angst',
        'Midway through a sanctimonious sermon, the minister abruptly abdicated his pulpit, sparking discussions about ecclesiastical politics.',
        "The art nouveau flourishes on Gaudi's Sagrada Familia stir piquant juxtapositions of religious iconography and architectural flamboyance.",
        "Bioluminescent organisms illuminate the ocean's abysmal depths, creating a nebula of glimmering lifeforms in an otherwise pitch-black realm."
      ][numSentencesDone]
    }
    return ''
  }
}

export default DbService
