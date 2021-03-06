var mongoose   = require ("mongoose");
var bcrypt     = require ("bcrypt-nodejs");
var validator  = require ("validator");


var userSchema = new mongoose.Schema({
  username     : {type: String},
  image        : {type: String},
  email        : {type: String, required: true, unique: true},
  passwordHash : {type: String}
}, {
  timestamps: true
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash, null);
}

userSchema.virtual('password')
  .set(function(password){
    this._password = password;
    this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  })


userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })


userSchema.path('passwordHash')
  .validate(function(){
    if (this.isNew) {
      if (!this._password) {
          this.invalidate("password", "required");
      }
      if (this._password.length < 6) {
        this.invalidate("password", "must be greater than 6 characters");
      }
      if (this._password !== this._passwordConfirmation) {
          this.invalidate("passwordConfirmation", "must match the password");
      }
    }
  })

  userSchema.path('email')
  .validate(function(email) {
    if (!validator.isEmail(email)) {
      this.invalidate("email", "must be a valid email address");
    }
  })


  userSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    delete ret.passwordHash;
    return ret;
  }
})


module.exports = mongoose.model('User', userSchema);
