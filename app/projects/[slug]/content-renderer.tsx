'use client'

import HTMLReactParser from 'html-react-parser'

interface ContentRendererProps {
  content: string
}

const ContentRenderer = (props: ContentRendererProps) => {
  return (
    <div className='prose lg:prose-xl prose-zinc prose-quoteless'>
      {HTMLReactParser(props.content)}
    </div>
  )
}

export default ContentRenderer
