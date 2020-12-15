import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRef } from 'react'
import { Button } from '@material-ui/core'
import Link from 'next/link'
import { useThree } from '../hooks/useThree'
import styles from '../styles/Home.module.css'
import MainLayout from '../layout/mainLayout'

export default function Home() {
  const canvasMain = useRef<HTMLDivElement>(null)

  return (
    <MainLayout>
      <div ref={canvasMain} className={styles.mainCanvas} />

      <div className={styles.content + ' App'}>
        <Formik
          initialValues={{ width: 10, height: 10, depth: 10 }}
          onSubmit={({ width, height, depth }) => {
            const { render } = useThree(
              {
                width,
                height,
                depth,
              },
              canvasMain
            )
            render()
          }}
        >
          {() => (
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
                className={'submitButton'}
              >
                Create BOX
              </Button>
            </Form>
          )}
        </Formik>

        <Link href={'/custom'}>
          <a>
            {' '}
            <div className="links">To custom page</div>
          </a>
        </Link>
      </div>
    </MainLayout>
  )
}
