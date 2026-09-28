import CommentBox from '@/components/modules/home/comment/comment-box';
import CommentListClass from '@/components/modules/home/comment/comment-list-class';

export default function MainPage() {
  return (
    <div>
      <h1>Main</h1>
      <div className="">
        <CommentBox />
        {/* <CommentList /> */}
        <CommentListClass />
      </div>
    </div>
  );
}
