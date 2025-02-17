const AuthLayout = ({children}:{children:Readonly<React.ReactNode>}) => {
  return (
    <body className='dark min-h-screen flex items-center justify-center'>{children}</body>
  )
}

export default AuthLayout
