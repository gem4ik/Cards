import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const nameMutation = z.object({
  name: z.string().min(3).trim(),
})

export type EditProfileValues = z.infer<typeof nameMutation>

export const useEditProfile = (initialValues: EditProfileValues = { name: '' }) =>
  useForm<EditProfileValues>({
    resolver: zodResolver(nameMutation),
    defaultValues: initialValues,
  })
