import { SkeletonPlaceholder } from 'carbon-components-react';

// style
import './FileLoading.scss';

export default function FileLoading() {
  return (
    <div className="skeleton__wrapper">
      {[...Array(11)].map((_, i) => (
        <SkeletonPlaceholder key={i} className="skeleton__row" />
      ))}
    </div>
  );
}
