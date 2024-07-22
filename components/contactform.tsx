// app/components/contactform.tsx

import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Input,
  Link,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material'
import Card from '@mui/material/Card'
import { Form } from 'antd'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'

const API_CONTACT_URL = process.env.NEXT_PUBLIC_API_CONTACT_URL
const RECAPTCHA_PUBLIC_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY
const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY

function ContactForm (props) {
  const [form] = Form.useForm()
  const captchaRef = React.createRef()
  const [successMessage, setSuccessMessage] = useState('')
  const { t } = useTranslation('common')
  const handleFinish = async (values) => {
    try {
      const response = await axios.post(
                `${API_CONTACT_URL}/submit-contact-form`,
                new URLSearchParams(values).toString(),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Recaptcha-Secret': RECAPTCHA_SECRET_KEY
                  }
                }
      )
      console.log('Response from server:', response.data)
      setSuccessMessage('Form submitted successfully!')
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
  return (
    <>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: 'background.dark'
        }}
      >
        <Container maxWidth='lg'>
          <Stack spacing={8}>
            <Card
              variant='outlined'
              sx={{
                // backgroundColor: 'black',
                // color: 'white',
                border: '1px solid #fff',
                theme: theme => ({
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
                })
              }}
            >
              <CardHeader title={t('contact_form')} />
              <Divider />
              <Form
                name='form-contact'
                form={form}
                onFinish={handleFinish}
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  title: '',
                  message: '',
                  captcha: ''
                }}
              >
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid xs={12} lg={6}>
                      <Typography variant='subtitle2'>
                        {t('contact_name')}
                      </Typography>
                      <Form.Item name='name' noStyle>
                        <Input fullWidth name='name' required placeholder={t('contact_name_placeholder')} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={12} lg={6}>
                      <Typography sx={{ mb: 1 }} variant='subtitle2'>
                        {t('contact_email')}
                      </Typography>
                      <Form.Item name='email' noStyle>
                        <Input fullWidth name='email' type='email' required placeholder={t('contact_email_placeholder')} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={12} lg={6}>
                      <Typography sx={{ mb: 1 }} variant='subtitle2'>
                        {t('contact_phone')}
                      </Typography>
                      <Form.Item name='phone' noStyle>
                        <Input fullWidth name='phone' type='tel' required placeholder={t('contact_phone_placeholder')} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={12} lg={6}>
                      <Typography sx={{ mb: 1 }} variant='subtitle2'>
                        {t('contact_formtitle')}
                      </Typography>
                      <Form.Item name='title' noStyle>
                        <Input fullWidth name='title' required placeholder={t('contact_title_placeholder')} />
                      </Form.Item>
                    </Grid>
                    <Grid xs={12}>
                      <Typography sx={{ mb: 1 }} variant='subtitle2'>
                        {t('contact_message')}
                      </Typography>
                      <Form.Item name='message' noStyle>
                        <Input
                          fullWidth
                          name='message'
                          required
                          multiline
                          rows={6}
                          placeholder={t('contact_message_placeholder')}
                        />
                      </Form.Item>
                    </Grid>
                  </Grid>

                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: 3
                    }}
                  >
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey={RECAPTCHA_PUBLIC_KEY}
                      size='invisible'
                      onChange={value => {
                        form.setFieldsValue({ captcha: value })
                        form.submit()
                      }}
                    />
                    <Button
                      color='primary'
                      fullWidth
                      size='large'
                      variant='contained'
                      type='submit'
                    >
                      {t('contact_submit')}
                    </Button>
                  </Box>
                  {successMessage && (
                    <Typography
                      align='center'
                      color='primary'
                      sx={{ mt: 2 }}
                      variant='body2'
                    >
                      {successMessage}
                    </Typography>
                  )}
                  <Typography
                    align='center'
                    color='text.secondary'
                    sx={{ mt: 2 }}
                    variant='body2'
                  >
                    {t('contact_rules_agree')}{' '}
                    <Link
                      color='text.primary'
                      href='/tos'
                      underline='always'
                      variant='subtitle2'
                    >
                      {t('terms_of_services')}
                    </Link>{' '}
                    {t('and_common')}{' '}
                    <Link
                      color='text.primary'
                      href='/privacy'
                      underline='always'
                      variant='subtitle2'
                    >
                      {t('privacy_policy')}
                    </Link>
                    .
                  </Typography>
                </CardContent>
              </Form>
            </Card>

          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default ContactForm
