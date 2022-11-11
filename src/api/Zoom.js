import axios from 'axios';
import { getLoginCookie } from '../utils/Auth';
import {domain} from './Consts';
import {api} from './User';


export function deleteZoom(data) {
	return api("delete_zoom_meet", data);
}

export function createZoom(data) {
	return api("create_zoom_meet", data);
}

export  function updateZoom(data) {
	return api("update_zoom_meet");
}

export function scorm_file_upload(data){
	return api("get_file_post_url",data);
}