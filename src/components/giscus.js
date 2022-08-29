import GiscusComponent from '@giscus/react'

export const Giscus = () => {
  return (
    <GiscusComponent
      repo='xarray-contrib/xarray.dev'
      repoId='MDEwOlJlcG9zaXRvcnkzOTI3NDc3OTQ='
      category='Blog Comments'
      categoryId='DIC_kwDOF2jbEs4CPUDg'
      mapping='pathname'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='bottom'
      theme={'light'}
      lang={'en'}
      loading={'lazy'}
    />
  )
}
