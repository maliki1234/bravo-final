

import { baseUrl } from '@/app/page'
import RegisterForm from '@/components/auth/RegisterForm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
 
  return (
    <>
    <RegisterForm />
    </>

  )
}
