import Route from '@ioc:Adonis/Core/Route';
import auth from './auth';
import user from './user';
import scores from './scores';
import semesters from './semesters';
import students from './students';

export default function v1() {
	Route.group(() => {
		auth();
		user();
		scores();
		semesters();
		students();
	}).prefix('/v1');
}
