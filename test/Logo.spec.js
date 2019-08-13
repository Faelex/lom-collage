import { mount } from '@vue/test-utils'
import Logo from '~/components/Logo.vue'
import Index from '~/pages/index.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('Index Page', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
