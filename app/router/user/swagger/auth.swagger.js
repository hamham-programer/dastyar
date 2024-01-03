/**
 *  @swagger
 *   components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for siginup/siginin
 *          checkOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for siginup/siginin
 *                  code:
 *                      type: intger
 *                      description: recive code from getotp
 *                  
 */

/**
 *  @swagger
 *   tags:
 *      -name : user-Authentication
 *      description: user-auth section
 */

/**
 *  @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [user-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: one time password login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  descrption: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  descrption: Internal Server Error
 */

/**
 *  @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [user-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: one time password login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  descrption: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  descrption: Internal Server Error
 */