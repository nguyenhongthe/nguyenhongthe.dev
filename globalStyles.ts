export const globalStyles = {
  '.link-primary': {
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      color: 'primary',
      textDecoration: 'underline'
    },
    '&:active': {
      color: 'primary-active',
      textDecoration: 'underline',
      backgroundColor: 'primary-active-bg'
    },
    '&.underline': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 0.2rem #1274A333',
      borderRadius: '0.15rem'
    },
    '&.highlight': {
      color: '#0b8cc4'
    }
  }
}
