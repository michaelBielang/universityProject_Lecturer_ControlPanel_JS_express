// noinspection SqlResolve
/**
 * Created by Michael Bielang on 31.03.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */

exports.createTableStatements = {
  user: 'CREATE TABLE user(pk_user_id VARCHAR(20) PRIMARY KEY NOT NULL, first_name VARCHAR(255), last_name VARCHAR(255), e_mail VARCHAR(255), password VARCHAR(255), last_action DATETIME)',
}
