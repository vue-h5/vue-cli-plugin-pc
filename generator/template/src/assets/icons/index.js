const requireAll = requireContext => requireContext.keys().map(requireContext)
// eslint-disable-next-line no-undef
requireAll(require.context('./svg', false, /\.svg$/))