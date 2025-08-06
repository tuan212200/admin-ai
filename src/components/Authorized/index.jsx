import Authorized from './Authorized';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
import { CURRENT } from './renderAuthorize';

Authorized.Secured = Secured;
Authorized.check = check;

const RenderAuthorize = renderAuthorize(Authorized);

/**
 * Reload the current authority
 */
export function reloadAuthorized() {
  RenderAuthorize.CURRENT = CURRENT;
}

export default RenderAuthorize;