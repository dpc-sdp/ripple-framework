import { Ref, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export default function useImageLoader(source: string, image: Ref) {
  const loaded = ref(false)

  const loadImage = () => {
    const image = new Image();

    image.onload = () => {
      loaded.value = true
    }

    image.src = source
  }

  const { stop } = useIntersectionObserver(image, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      stop()
      loadImage()
    }
  })

  return loaded
}
