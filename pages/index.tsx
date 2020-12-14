import { Formik, Form, Field, ErrorMessage } from 'formik'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRef } from 'react'
// @ts-ignore
import Button from '@material-ui/core/Button'
import { useThree } from '../hooks/useThree'

interface IBox {
  width: number
  height: number
  depth: number
}

export default function Home() {
  const canvasMain = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div ref={canvasMain} className={styles.mainCanvas} />
        <div className={styles.content + ' App'}>
          <Formik
            initialValues={{ width: 42, height: 10, depth: 10 }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              const { render } = useThree(
                {
                  width: values.width,
                  height: values.height,
                  depth: values.depth,
                },
                canvasMain
              )
              render()
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="number" name="width" />
                <div>Width</div>
                <ErrorMessage name="width" component="div" />
                <Field type="number" name="height" />
                <div>Height</div>
                <ErrorMessage name="height" component="div" />
                <Field type="number" name="depth" />
                <div>Depth</div>
                <ErrorMessage name="depth" component="div" />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className={'submitButton'}
                >
                  Create BOX
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  )
}
