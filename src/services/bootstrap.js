import S from 'string';
import request from './request';

export default function boot() {
  S.extendPrototype();
  request.attachTokenHeader();
}