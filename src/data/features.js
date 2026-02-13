import { useLingui } from '@lingui/react/macro'

export const getFeatures = () => {
  const { t } = useLingui()
  let Features = [
    {
      title: t`Interoperability`,
      text: t`Interoperable with the scientific Python ecosystem including NumPy, Dask, Pandas, and Matplotlib.`,
    },
    {
      title: t`Apply operations over named dimensions`,
      text: '',
    },
    {
      title: t`Select values by label instead of integer location`,
      text: '',
    },
    {
      title: t`Vectorized operations`,
      text: t`Mathematical operations vectorize across multiple dimensions (array broadcasting) based on dimension names, not shape.`,
    },
    {
      title: t`GroupBy operations`,
      text: t`Flexible split-apply-combine operations with groupby.`,
    },
    {
      title: t`Database like operations`,
      text: t`Database like alignment based on coordinate labels that smoothly handles missing values.`,
    },
    {
      title: t`Arbitrary metadata tracking`,
      text: 'Keep track of arbitrary metadata in the form of a Python dictionary.',
    },
    {
      title: t`Flexible and Extensible I/O backend API`,
      text: t`Read and write data to and from NetCDF, HDF, Zarr, OpenDAP, and GRIB.`,
    },
  ]
  return Features
}
