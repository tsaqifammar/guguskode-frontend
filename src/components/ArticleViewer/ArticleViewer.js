import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

function ArticleViewer({ content }) {
  return (
    <MDEditor.Markdown
      source={content}
      rehypePlugins={[[rehypeSanitize]]}
    />
  );
}

export default ArticleViewer;
