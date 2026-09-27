import { v4 as uuidv4 } from "uuid"

class Agreement {
  constructor(connection) {
    this.connection = connection;
    this.id = null;
    this.userId = null;
    this.agreementType = '';
    this.ipAddress = '';
    this.userAgent = '';
    this.agreementTimestamp = null;
  }

  async save() {
    const { userId, agreementType, ipAddress, userAgent } = this;
    const sql = 'INSERT INTO agreements (id, userId, agreementType, ipAddress, userAgent) VALUES (?, ?, ?, ?, ?)';
    const id = uuidv4()
    const values = [id, userId, agreementType, ipAddress, userAgent];

    try {
      const [result] = await this.connection.execute(sql, values);
      this.id = id;
      return this.id;
    } catch (error) {
      console.error('Error saving agreement:', error);
      throw error;
    }
  }
}

export default Agreement;
export { Agreement };
