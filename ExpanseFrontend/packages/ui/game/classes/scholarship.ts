import { ScholarshipInterface } from "../types"

// todo some of this will be moved to the backend
export class Scholarship implements ScholarshipInterface {
  id: string
  universityName: string
  universityId: string
  voucherId: string
  value: number
  createdAt: string
  type: "scholarship"

  constructor(data: {
    id: string
    universityName?: string
    universityId?: string
    voucherId?: string
    value?: number
    createdAt?: string
  }) {
    this.id = data.id
    this.universityName = data.universityName || ""
    this.universityId = data.universityId || ""
    this.voucherId = data.voucherId || ""
    this.value = data.value || 0
    this.createdAt = data.createdAt || ""
    this.type = "scholarship"
  }

  static create(data: {
    id: string
    universityName: string
    value: number
    universityId: string
    voucherId: string
  }): Scholarship {
    return new Scholarship({
      ...data,
      createdAt: new Date().toISOString(),
    })
  }

  static generateFake(): Scholarship {
    return new Scholarship({
      id: Math.random().toString(36).substring(7),
      universityName: "You Are Worthy University",
      universityId: Math.random().toString(36).substring(7),
      voucherId: Math.random().toString(36).substring(7),
      value: 100,
      createdAt: new Date().toISOString(),
    })
  }

  toJson(): object {
    return {
      id: this.id,
      universityName: this.universityName,
      universityId: this.universityId,
      voucherId: this.voucherId,
      value: this.value,
      createdAt: this.createdAt,
    }
  }
}
