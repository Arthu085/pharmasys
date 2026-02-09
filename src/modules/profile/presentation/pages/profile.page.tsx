import { Typography, Card, Skeleton } from "antd";
import { profileService } from "../../infrastructure/services/profile.service";
import type { IProfileData } from "../../domain/dtos/profile-response.dto";
import { ProfileDetails } from "../components/profile-details";
import { useFetchData } from "@/shared/hooks/use-fetch-data";

const { Title } = Typography;

export const ProfilePage = () => {
	const { loading, data: user } = useFetchData<IProfileData>(
		profileService.profile,
	);

	return (
		<>
			<Title level={2} style={{ marginBottom: 24 }}>
				Meu Perfil
			</Title>
			<Card>
				<Skeleton loading={loading} avatar active paragraph={{ rows: 4 }}>
					{user ? <ProfileDetails user={user} /> : null}
				</Skeleton>
			</Card>
		</>
	);
};
