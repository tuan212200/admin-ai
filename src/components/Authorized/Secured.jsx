import React from 'react';
import CheckPermissions from './CheckPermissions';
/** Default is "NULL" - cannot access any page */

const Exception403 = () => 403;

export const isComponentClass = (component) => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
}; 

// Determine whether the incoming component has been instantiated
// AuthorizedRoute is already instantiated
// Authorized render is already instantiated, children is no instantiated
// Secured is not instantiated
const checkIsInstantiation = (target) => {
  if (isComponentClass(target)) {
    const Target = target;
    return (props) => <Target {...props} />;
  }

  if (React.isValidElement(target)) {
    return (props) => React.cloneElement(target, props);
  }

  return () => target;
};

/**
 * Used to determine whether you have permission to access this view
 * authority supports string, () => boolean | Promise
 * e.g. 'user' only user can access
 * e.g. 'user,admin' user and admin can access
 * e.g. ()=>boolean true can access, false cannot access
 * e.g. Promise then can access, catch cannot access
 *
 * @param {string | function | Promise} authority
 * @param {ReactNode} error optional parameter
 */
const authorize = (authority, error) => {
  /**
   * Convert into a class to prevent errors when string parameters are passed
   */
  let classError = false;

  if (error) {
    classError = () => error;
  }

  if (!authority) {
    throw new Error('authority is required');
  }

  return function decideAuthority(target) {
    const component = CheckPermissions(authority, target, classError || Exception403);
    return checkIsInstantiation(component);
  };
};

export default authorize;