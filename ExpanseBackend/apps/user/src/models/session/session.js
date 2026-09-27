import { AuthConfig } from "../../config/auth.config.js"
import jwt from "jsonwebtoken"
import moment from 'moment'
import { v4 as uuidv4 } from "uuid"

class Session {
  constructor(connection) {
    this.connection = connection
    this.id = null
    this.userId = null
    this.jwt = ""
    this.ipAddress = ""
    this.userAgent = ""
    this.createdAt = null
    this.updatedAt = null
  }

  /* 
  This function creates a jwt from an object named jwtData passed in through paramters 
  This function references the secretKey for creating the JWT from AuthConfig.jwtSecretKey
  This function utilizes the jwt library from 'jsonwebtoken'
  This function creates a jwt that expires in 3 days
  This function updates the models jwt property with the created jwt after creating it
  This function returns the created jwtToken.
  */
  createJwt(jwtData) {
    const expiresIn = "365d"
    const secretKey = AuthConfig.jwtSecretKey
    this.jwt = jwt.sign(jwtData, secretKey, { expiresIn })
    return this.jwt
  }

  /*
    This function should accept an ipAddress, userAgent, and User.
    It should call createJWT to create and set JWT on the session object
    It should save to the database and return the updated session instance
  */
  async createSession({ clientIp, clientUserAgent, User }) {
    this.ipAddress = clientIp
    this.userAgent = clientUserAgent
    this.userId = User.id
    this.createJwt({
      currentUser: User.id,
      user: User.toJson(),
    })
    await this.save()
    return this
  }

  /*
  This function saves the properties of the model to the database using the connection object.
  Does an update if there is an id, does an insert if there is not
  Updates the models id after successful insertion
  Returns the id from the successful insertion
  Update the createdAt or updatedAt timestamps
  User id should not be updated in the update query
  */
  async save() {
    try {
      const timestamp = moment()
      
      if (this.id) {
        throw new Error('Untested implementation')
        // const values = [
        //   this.jwt,
        //   this.ipAddress,
        //   this.userAgent,
        //   timestamp,
        //   this.id
        // ];
        // // Update the existing session record
        // const updateQuery = `
        //   UPDATE sessions
        //   SET jwt = ?, ipAddress = ?, userAgent = ?, updatedAt = ?
        //   WHERE id = ?
        // `;
        // await this.connection.execute(updateQuery, values);
      } else {
        const id = uuidv4()
        const values = [
          id,
          this.userId,
          this.jwt,
          this.ipAddress,
          this.userAgent,
          timestamp.format('YYYY-MM-DD HH:mm:ss.sss'),
          timestamp.format('YYYY-MM-DD HH:mm:ss.sss')
        ]
        // Insert a new session record
        const insertQuery = `
          INSERT INTO sessions (id, userId, jwt, ipAddress, userAgent, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `
        const [result] = await this.connection.execute(insertQuery, values)
        this.createdAt = timestamp.toISOString()
        this.updatedAt = timestamp.toISOString()
        this.id = id
      }
      return this.id
    } catch (error) {
      throw new Error('Error saving session to the database')
    }
  }

  async deleteByJwt(jwt) {
    const query = "DELETE FROM sessions WHERE jwt = ?"
    const [rows] = await this.connection.execute(query, [jwt])
    console.log('Finding session by jwt', {jwt})

    if(rows.affectedRows) {
      // this.mapRowToModel(rows[0])
      console.log('Session found and deleted jwt')
      return true
    } 

    console.log('No session found for jwt')
    return false
  }

  // This function should return fields of the model in a simple json object.
  toJson() {
    const { connection, ...jsonObject } = this
    return jsonObject
  }
}

export default Session
export { Session }
