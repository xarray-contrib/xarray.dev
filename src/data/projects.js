import { useLingui } from '@lingui/react/macro'

export function getProjects() {
  const { t } = useLingui()
  return [
    {
      name: 'xgcm',
      description: t`General Circulation Model Postprocessing with xarray`,
      domains: [t`🌊 Oceanography`],
      repo: 'https://github.com/xgcm/xgcm',
      homepage: 'https://xgcm.readthedocs.io/en/latest/',
      logo: '/projects/xgcm-logo.png',
    },
    {
      name: 'verde',
      description: t`Python library for processing spatial data and interpolating it on regular grids`,
      domains: [t`🗺️ Geographic Processing`],
      repo: 'https://github.com/fatiando/verde',
      homepage: 'https://www.fatiando.org/verde/latest/',
      logo: '/projects/verde-logo.svg',
    },
    {
      name: 'arviz',
      description: t`Backend-agnostic tools for diagnostics and visualizations of Bayesian inference in Python`,
      domains: [t`Bayesian Inference`],
      repo: 'https://github.com/arviz-devs/arviz',
      homepage: 'https://arviz-devs.github.io/arviz/',
      logo: '/projects/ArviZ.svg',
    },
    {
      name: 'MetPy',
      description: `tCollection of tools for reading, visualizing and performing calculations with weather data`,
      domains: [t`🌪🌡 Meteorology`],
      repo: 'https://github.com/Unidata/MetPy',
      homepage: 'https://unidata.github.io/MetPy',
      logo: '/projects/metpy_horizontal.png',
    },
    {
      name: 'climpred',
      description: t`Verification of weather and climate forecasts`,
      domains: [t`🌎 Geoscience`],
      repo: 'https://github.com/pangeo-data/climpred',
      homepage: 'https://climpred.readthedocs.io/',
      logo: '/projects/climpred-logo.png',
    },
    {
      name: 'xarray-spatial',
      description: t`Raster-based Spatial Analytics for Python`,
      domains: [t`🗺️ Geographic Processing`],
      repo: 'https://github.com/makepath/xarray-spatial',
      homepage: 'https://xarray-spatial.readthedocs.io/en/stable/',
      logo: '/projects/Xarray-Spatial-logo.svg',
    },
    {
      name: 'SquidPy',
      description: t`Collection of tools for the analysis and visualization of spatial molecular data`,
      domains: [t`💊 Bioinformatics`],
      repo: 'https://github.com/theislab/squidpy',
      homepage: 'https://squidpy.readthedocs.io/en/stable/',
      logo: '/projects/squidpy_horizontal.png',
    },
    {
      name: 'hvPlot',
      description: t`A high-level plotting API for the PyData ecosystem built on HoloViews`,
      domains: ['📊 Visualization'],
      repo: 'https://github.com/holoviz/hvplot',
      homepage: 'https://hvplot.holoviz.org/',
      logo: '/projects/hvplot-logo_horizontal.svg',
    },
    {
      name: 'Pangeo',
      description: 'A community platform for Big Data geoscience',
      domains: ['🌎 Geoscience'],
      homepage: 'https://pangeo.io/',
      repo: 'https://github.com/pangeo-data',
      logo: '/projects/pangeo_simple_logo.svg',
    },
    {
      name: 'cf-xarray',
      description:
        'An accessor for Xarray objects that interprets  Climate and Forecast (CF) metadata convention attributes',
      domains: ['🌎 Geoscience'],
      homepage: 'https://cf-xarray.readthedocs.io',
      repo: 'https://github.com/xarray-contrib/cf-xarray',
      logo: '/projects/cf-xarray-logo.svg',
    },
    {
      name: 'omfit',
      description:
        'Integrated modeling and experimental data analysis software for magnetically confined thermonuclear fusion experiments',
      domains: ['💥 plasma physics'],
      homepage: 'https://omfit.io',
      repo: 'https://omfit.io/install.html#get-access-to-the-omfit-source-code',
      logo: '/projects/OMFIT_logo.png',
    },
    {
      name: 'sgkit',
      description: 'Scalable statistical genetic data analysis in Python',
      domains: ['🧬 genomics'],
      homepage: 'https://sgkit-dev.github.io/sgkit/latest/',
      repo: 'https://github.com/sgkit-dev/sgkit',
      logo: '/projects/sgkit_trnsprnt.png',
    },
    {
      name: 'xmip',
      description:
        'Analysis ready CMIP6 data in Python the easy way with pangeo tools.',
      domains: ['🌎 Geoscience'],
      homepage: 'https://cmip6-preprocessing.readthedocs.io/',
      repo: 'https://github.com/jbusecke/xmip',
      logo: '/projects/xmip.png',
    },
  ]
}
