import React from 'react';
import { Alert, StyleSheet, Text, ScrollView } from 'react-native';
import { LoginInput } from '../components/input';
import { Button } from '../components/button';
// import { UserStore } from '../stores/UserStore';
import { styleConstants } from '../config/constants';
import {
  requiredFieldsEmpty,
  ValidationObject,
  ObjectToValidate,
} from '../utilities/FormValidation';
import { copy } from '../config/static.copy';

interface Props {
  navigation: any;
}

interface State {
  email: string;
  password: string;
}
export class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  private onPressSignUpButton = async (): Promise<void> => {
    const { email, password } = this.state;
    const validationFields: ObjectToValidate[] = [
      { key: 'email', value: email },
      { key: 'password', value: password },
    ];
    const validationErrors: ValidationObject[] = requiredFieldsEmpty(
      ...validationFields
    );
    if (validationErrors.length !== 0) {
      Alert.alert('Sign Up Error', validationErrors[0].message);
      return;
    }

    // const userStore: UserStore = new UserStore();
    try {
      // await userStore.signUp(email, password);
      Alert.alert('User signed up successfully');
    } catch (errors) {
      Alert.alert('Sign Up Error', JSON.stringify(errors));
    }

    // if (this.props.userStore.isAuthenticated) {
    //   this.props.navigation.navigate('Map');
    // }
  };

  public render(): JSX.Element {
    const { email, password, firstName, lastName } = this.state;
    const validationFields: ObjectToValidate[] = [
      { key: 'email', value: email },
      { key: 'password', value: password },
      { key: 'First Name', value: firstName },
      { key: 'Last Name', value: lastName },
    ];
    return (
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>{copy.signUpUIStrings.SIGN_UP_TITLE}</Text>
        <LoginInput
          title="First Name*"
          placeholder={copy.signUpUIStrings.FIRST_NAME_INPUT_PLACEHOLDER}
          onChangeText={(firstName: string) => {
            this.setState({ firstName: firstName });
          }}
        />
        <LoginInput
          title="Last Name*"
          placeholder={copy.signUpUIStrings.LAST_NAME_INPUT_PLACEHOLDER}
          onChangeText={(lastName: string) => {
            this.setState({ lastName: lastName });
          }}
        />
        <LoginInput
          title="Email*"
          placeholder={copy.signUpUIStrings.EMAIL_INPUT_PLACEHOLDER}
          onChangeText={(email: string) => {
            this.setState({ email: email });
          }}
          keyboardType="email-address"
        />
        <LoginInput
          title="Password*"
          secureTextEntry={true}
          placeholder={copy.signUpUIStrings.PASSWORD_INPUT_PLACEHOLDER}
          onChangeText={(password: string) => {
            this.setState({ password: password });
          }}
        />
        <LoginInput
          title="Phone Number"
          placeholder={copy.signUpUIStrings.PHONE_NUMBER_INPUT_PLACEHOLDER}
          onChangeText={(phoneNumber: string) => {
            this.setState({ phoneNumber: phoneNumber });
          }}
          keyboardType="phone-pad"
        />
        <Button
          invalid={requiredFieldsEmpty(...validationFields).length !== 0}
          onPress={this.onPressSignUpButton}
        >
          <Text>{copy.signUpUIStrings.SIGN_UP}</Text>
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
    paddingHorizontal: '7.5%',
  },
  title: {
    fontSize: styleConstants.fontSize.XX_LARGE,
    color: styleConstants.colors.TITLE_PRIMARY,
    fontWeight: styleConstants.fontWeight.BOLD,
    width: '100%',
  },
});
