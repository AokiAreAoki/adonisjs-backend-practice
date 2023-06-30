import Route from '@ioc:Adonis/Core/Route';
import v1 from './v1';

export default function api() {
	Route.group(() => {
		v1();
	}).prefix('/api');
}
