import { useLingui } from '@lingui/react/macro'

export const getLibraries = () => {
  const { t } = useLingui()
  let Libraries = [
    {
      name: 'NumPy',
      description: t`NumPy is the fundamental package for array computing with Python.`,
      url: 'https://numpy.org',
      repo: 'https://github.com/numpy/numpy',
      logo: '/libraries/numpy_logo.svg',
    },
    {
      name: 'Dask',
      description: t`Distributed arrays and advanced parallelism for analytics, enabling performance at scale.`,
      url: 'https://dask.org/',
      repo: 'https://github.com/dask/dask',
      logo: '/libraries/dask_horizontal.svg',
    },
    {
      name: 'CuPy',
      description: t`NumPy-compatible array library for GPU-accelerated computing with Python.`,
      url: 'https://cupy.chainer.org/',
      repo: 'https://github.com/cupy/cupy',
      logo: '/libraries/cupy_logo_1000px.png',
    },
    {
      name: 'Zarr',
      description: t`An implementation of chunked, compressed, N-dimensional arrays for Python.`,
      url: 'http://zarr.readthedocs.io/',
      repo: 'https://github.com/zarr-developers/zarr-python',
      logo: '/libraries/zarr-pink-stacked.svg',
    },
    {
      name: 'Sparse',
      description: t`Sparse multi-dimensional arrays for the PyData ecosystem`,
      url: 'https://sparse.pydata.org/',
      repo: 'https://github.com/pydata/sparse',
      logo: '/libraries/sparse-logo.png',
    },
    {
      name: 'Pint',
      description: t`Operate and manipulate physical quantities in Python`,
      url: 'http://pint.readthedocs.org/',
      repo: 'https://github.com/hgrecco/pint',
      logo: '/libraries/pint-logo-full.jpg',
    },
  ]
  return Libraries
}
