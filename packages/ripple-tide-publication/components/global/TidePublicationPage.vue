<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :siteSection="page.siteSection"
    :pageTitle="page.title"
    :pageLanguage="page.lang"
    :updatedDate="page.changed || page.created"
    :showContentRating="page.showContentRating"
  >
    <template #aboveHeader>
      <slot name="aboveHeader"></slot>
    </template>
    <template #primaryNav>
      <slot name="primaryNav"></slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs">
        <TideBreadcrumbs
          :items="page.breadcrumbs"
          :besideQuickExit="site?.showQuickExit"
        />
      </slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <slot name="aboveBody" :hasBreadcrumbs="hasBreadcrumbs"></slot>
    </template>
    <template #body>
      <TideLandingPageInPageNavigation
        v-if="page.showInPageNav"
        :headingLevel="page.inPageNavHeadingLevel"
        :components="page.bodyComponents"
      />
      <TidePublicationBody
        :components="page.bodyComponents"
      ></TidePublicationBody>
      <TidePublicationPagination
        :pagination="page.publication.pagination"
        :navigation="nav"
      ></TidePublicationPagination>
    </template>
    <template #sidebar>
      <TidePublicationSidebar
        :publication="page.publication"
        :navigation="nav"
      ></TidePublicationSidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { indexNode, TidePublicationPagePage } from '../../types'
import { processMenu, useRoute, useTidePublicationMenu } from '#imports'
import { ref } from 'vue'

interface Props {
  site: any
  page: TidePublicationPagePage
}

const props = defineProps<Props>()

const nav = ref<Array<indexNode>>([])

const menu = props.page?.publication?.id
  ? await useTidePublicationMenu(props.page.publication.id)
  : null

if (menu) {
  nav.value = processMenu(menu.publication, useRoute())
}
</script>
